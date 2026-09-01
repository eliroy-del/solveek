"use client";

import { useMemo, useState } from "react";
import type { ContentField, ContentTypeConfig } from "@/lib/crm/content-types";
import {
  deleteContentItem,
  saveContentItem,
} from "@/app/crm/(app)/content/actions";

function fieldValue(
  field: ContentField,
  record: Record<string, unknown> | null
): string {
  const value = record?.[field.name];
  if (field.type === "array") {
    return Array.isArray(value) ? value.join("\n") : "";
  }
  if (field.type === "json") {
    return value == null ? "" : JSON.stringify(value, null, 2);
  }
  if (field.type === "checkbox") {
    return value ? "on" : "";
  }
  if (value == null) return "";
  return String(value);
}

export function ContentEditorForm({
  config,
  record,
  id,
}: {
  config: ContentTypeConfig;
  record: Record<string, unknown> | null;
  id: string;
}) {
  const initial = useMemo(() => {
    const values: Record<string, string> = {};
    for (const field of config.fields) {
      if (record) {
        values[field.name] = fieldValue(field, record);
      } else if (field.type === "checkbox") {
        values[field.name] =
          config.createDefaults?.[field.name] === true ? "on" : "";
      } else if (field.type === "array") {
        const def = config.createDefaults?.[field.name];
        values[field.name] = Array.isArray(def) ? def.join("\n") : "";
      } else if (field.type === "json") {
        const def = config.createDefaults?.[field.name] ?? {};
        values[field.name] = JSON.stringify(def, null, 2);
      } else {
        const def = config.createDefaults?.[field.name];
        values[field.name] = def == null ? "" : String(def);
      }
    }
    return values;
  }, [config, record]);

  const [values, setValues] = useState(initial);
  const published = values.published === "on" || record?.published === true;

  function setField(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form action={saveContentItem} className="space-y-5">
      <input type="hidden" name="type" value={config.key} />
      <input type="hidden" name="id" value={id} />

      <div className="space-y-4 rounded-xl border border-border bg-white p-5">
        {config.fields.map((field) => {
          if (field.type === "checkbox") {
            return (
              <label
                key={field.name}
                className="flex items-center gap-2 text-sm font-medium text-navy"
              >
                <input
                  type="checkbox"
                  name={field.name}
                  checked={values[field.name] === "on"}
                  onChange={(e) =>
                    setField(field.name, e.target.checked ? "on" : "")
                  }
                  className="size-4 rounded border-border"
                />
                {field.label}
              </label>
            );
          }

          if (field.type === "textarea" || field.type === "array" || field.type === "json") {
            return (
              <label key={field.name} className="block text-sm">
                <span className="mb-1.5 block font-medium text-navy">
                  {field.label}
                  {field.required ? " *" : ""}
                </span>
                <textarea
                  name={field.name}
                  required={field.required}
                  rows={field.rows ?? 4}
                  value={values[field.name] ?? ""}
                  onChange={(e) => setField(field.name, e.target.value)}
                  className="w-full rounded-lg border border-border px-3 py-2 font-mono text-sm outline-none ring-royal focus:ring-2"
                />
                {field.help ? (
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {field.help}
                  </span>
                ) : null}
              </label>
            );
          }

          return (
            <label key={field.name} className="block text-sm">
              <span className="mb-1.5 block font-medium text-navy">
                {field.label}
                {field.required ? " *" : ""}
              </span>
              <input
                type={
                  field.type === "number"
                    ? "number"
                    : field.type === "date"
                      ? "date"
                      : "text"
                }
                name={field.name}
                required={field.required}
                value={values[field.name] ?? ""}
                onChange={(e) => setField(field.name, e.target.value)}
                className="h-10 w-full rounded-lg border border-border px-3 outline-none ring-royal focus:ring-2"
              />
              {field.help ? (
                <span className="mt-1 block text-xs text-muted-foreground">
                  {field.help}
                </span>
              ) : null}
            </label>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          name="intent"
          value="save"
          className="inline-flex h-11 items-center rounded-lg bg-navy px-5 text-sm font-semibold text-white transition-colors hover:bg-royal"
        >
          Save
        </button>
        {config.hasPublished ? (
          published ? (
            <button
              type="submit"
              name="intent"
              value="unpublish"
              className="inline-flex h-11 items-center rounded-lg border border-border bg-white px-5 text-sm font-semibold text-navy transition-colors hover:bg-surface"
            >
              Unpublish
            </button>
          ) : (
            <button
              type="submit"
              name="intent"
              value="publish"
              className="inline-flex h-11 items-center rounded-lg bg-royal px-5 text-sm font-semibold text-white transition-colors hover:bg-navy"
            >
              Publish to live site
            </button>
          )
        ) : (
          <p className="self-center text-xs text-muted-foreground">
            Site blocks save directly to the live site.
          </p>
        )}
      </div>

      {id !== "new" ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            Delete removes this record permanently.
          </p>
          <button
            type="submit"
            formAction={deleteContentItem}
            className="mt-3 inline-flex h-10 items-center rounded-lg border border-red-300 bg-white px-4 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      ) : null}
    </form>
  );
}
