"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCrmUser } from "@/lib/crm/auth";
import {
  CONTENT_EDITOR_ROLES,
  getContentType,
  type ContentTypeConfig,
} from "@/lib/crm/content-types";

function parseArray(raw: FormDataEntryValue | null) {
  const text = String(raw ?? "");
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildPayload(config: ContentTypeConfig, formData: FormData) {
  const payload: Record<string, unknown> = {};

  for (const field of config.fields) {
    const raw = formData.get(field.name);

    if (field.type === "checkbox") {
      payload[field.name] = formData.get(field.name) === "on";
      continue;
    }

    if (field.type === "number") {
      const value = String(raw ?? "").trim();
      payload[field.name] = value === "" ? null : Number(value);
      continue;
    }

    if (field.type === "array") {
      payload[field.name] = parseArray(raw);
      continue;
    }

    if (field.type === "json") {
      const text = String(raw ?? "").trim();
      if (!text) {
        throw new Error("JSON value is required");
      }
      payload[field.name] = JSON.parse(text);
      continue;
    }

    payload[field.name] = String(raw ?? "").trim();
  }

  return payload;
}

function revalidateContent(config: ContentTypeConfig) {
  revalidatePath("/", "layout");
  for (const path of config.publicPaths) {
    revalidatePath(path);
    revalidatePath(path, "layout");
  }
  revalidatePath("/crm/content");
  revalidatePath(`/crm/content/${config.key}`);
}

async function requireEditor() {
  return requireCrmUser([...CONTENT_EDITOR_ROLES]);
}

export async function saveContentItem(formData: FormData) {
  const { supabase, profile } = await requireEditor();
  const typeKey = String(formData.get("type") ?? "");
  const id = String(formData.get("id") ?? "");
  const intent = String(formData.get("intent") ?? "save");
  const config = getContentType(typeKey);

  if (!config) {
    redirect("/crm/content?error=unknown-type");
  }

  let payload: Record<string, unknown>;
  try {
    payload = buildPayload(config, formData);
  } catch {
    redirect(`/crm/content/${typeKey}/${id || "new"}?error=invalid`);
  }

  if (config.hasPublished) {
    if (intent === "publish") payload.published = true;
    if (intent === "unpublish") payload.published = false;
  }

  if (config.table === "site_content" || config.table === "services") {
    payload.updated_at = new Date().toISOString();
  }

  if (id && id !== "new") {
    const { error } = await supabase
      .from(config.table)
      .update(payload)
      .eq("id", id);
    if (error) {
      console.error("content update", error.message);
      redirect(`/crm/content/${typeKey}/${id}?error=save`);
    }

    await supabase.from("crm_audit_logs").insert({
      user_id: profile.id,
      action:
        intent === "publish"
          ? "content.published"
          : intent === "unpublish"
            ? "content.unpublished"
            : "content.updated",
      entity_type: config.table,
      entity_id: id,
      metadata: { type: typeKey, intent },
    });

    revalidateContent(config);
    redirect(`/crm/content/${typeKey}/${id}?saved=1`);
  }

  const insertPayload = {
    ...(config.createDefaults ?? {}),
    ...payload,
  };

  const { data, error } = await supabase
    .from(config.table)
    .insert(insertPayload)
    .select("id")
    .single();

  if (error || !data) {
    console.error("content create", error?.message);
    redirect(`/crm/content/${typeKey}/new?error=save`);
  }

  await supabase.from("crm_audit_logs").insert({
    user_id: profile.id,
    action: "content.created",
    entity_type: config.table,
    entity_id: data.id,
    metadata: { type: typeKey, intent },
  });

  revalidateContent(config);
  redirect(`/crm/content/${typeKey}/${data.id}?saved=1`);
}

export async function deleteContentItem(formData: FormData) {
  const { supabase, profile } = await requireEditor();
  const typeKey = String(formData.get("type") ?? "");
  const id = String(formData.get("id") ?? "");
  const config = getContentType(typeKey);

  if (!config || !id) {
    redirect("/crm/content?error=unknown-type");
  }

  const { error } = await supabase.from(config.table).delete().eq("id", id);
  if (error) {
    console.error("content delete", error.message);
    redirect(`/crm/content/${typeKey}/${id}?error=delete`);
  }

  await supabase.from("crm_audit_logs").insert({
    user_id: profile.id,
    action: "content.deleted",
    entity_type: config.table,
    entity_id: id,
    metadata: { type: typeKey },
  });

  revalidateContent(config);
  redirect(`/crm/content/${typeKey}?deleted=1`);
}

export async function togglePublishContent(formData: FormData) {
  const { supabase, profile } = await requireEditor();
  const typeKey = String(formData.get("type") ?? "");
  const id = String(formData.get("id") ?? "");
  const published = String(formData.get("published") ?? "") === "true";
  const config = getContentType(typeKey);

  if (!config || !config.hasPublished || !id) {
    redirect("/crm/content?error=unknown-type");
  }

  const { error } = await supabase
    .from(config.table)
    .update({ published })
    .eq("id", id);

  if (error) {
    console.error("content publish toggle", error.message);
    redirect(`/crm/content/${typeKey}?error=publish`);
  }

  await supabase.from("crm_audit_logs").insert({
    user_id: profile.id,
    action: published ? "content.published" : "content.unpublished",
    entity_type: config.table,
    entity_id: id,
    metadata: { type: typeKey },
  });

  revalidateContent(config);
  redirect(`/crm/content/${typeKey}?saved=1`);
}
