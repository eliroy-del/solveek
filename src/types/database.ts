export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          short_title: string;
          description: string;
          long_description: string;
          icon: string;
          image: string;
          features: string[];
          benefits: string[];
          featured: boolean;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]> & {
          slug: string;
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
      };
      industries: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          icon: string;
          image: string;
          sort_order: number;
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["industries"]["Row"]> & {
          slug: string;
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["industries"]["Row"]>;
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          industry: string;
          location: string;
          challenge: string;
          solution: string;
          results: string[];
          image: string;
          gallery: string[];
          featured: boolean;
          sort_order: number;
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["projects"]["Row"]> & {
          slug: string;
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Row"]>;
      };
      insights: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          body: string;
          category: string;
          author: string;
          date: string;
          read_time: string;
          image: string;
          featured: boolean;
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["insights"]["Row"]> & {
          slug: string;
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["insights"]["Row"]>;
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string;
          sort_order: number;
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["faqs"]["Row"]> & {
          question: string;
          answer: string;
        };
        Update: Partial<Database["public"]["Tables"]["faqs"]["Row"]>;
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string;
          company: string;
          quote: string;
          rating: number;
          image: string;
          sort_order: number;
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["testimonials"]["Row"]> & {
          name: string;
          quote: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
      };
      stats: {
        Row: {
          id: string;
          value: number;
          suffix: string;
          label: string;
          decimals: number;
          sort_order: number;
          published: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["stats"]["Row"]> & {
          value: number;
          label: string;
        };
        Update: Partial<Database["public"]["Tables"]["stats"]["Row"]>;
      };
      process_steps: {
        Row: {
          id: string;
          step: number;
          title: string;
          description: string;
          published: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["process_steps"]["Row"]> & {
          step: number;
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["process_steps"]["Row"]>;
      };
      timeline: {
        Row: {
          id: string;
          year: string;
          title: string;
          description: string;
          sort_order: number;
          published: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["timeline"]["Row"]> & {
          year: string;
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["timeline"]["Row"]>;
      };
      offices: {
        Row: {
          id: string;
          city: string;
          country: string;
          address: string;
          phone: string;
          email: string;
          sort_order: number;
          published: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["offices"]["Row"]> & {
          city: string;
          country: string;
        };
        Update: Partial<Database["public"]["Tables"]["offices"]["Row"]>;
      };
      why_choose: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string;
          sort_order: number;
          published: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["why_choose"]["Row"]> & {
          title: string;
        };
        Update: Partial<Database["public"]["Tables"]["why_choose"]["Row"]>;
      };
      site_content: {
        Row: {
          id: string;
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["site_content"]["Row"]> & {
          key: string;
          value: Json;
        };
        Update: Partial<Database["public"]["Tables"]["site_content"]["Row"]>;
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          phone: string | null;
          subject: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          company?: string | null;
          phone?: string | null;
          subject?: string | null;
          message: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_submissions"]["Row"]>;
      };
      quote_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          phone: string | null;
          service: string | null;
          budget: string | null;
          timeline: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          company?: string | null;
          phone?: string | null;
          service?: string | null;
          budget?: string | null;
          timeline?: string | null;
          notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["quote_requests"]["Row"]>;
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: { email: string };
        Update: Partial<Database["public"]["Tables"]["newsletter_subscribers"]["Row"]>;
      };
    };
  };
};
