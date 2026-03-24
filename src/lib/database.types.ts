export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          amount: number | null
          appointment_date: string
          client_address: string | null
          client_id: string
          confirmation_code: string | null
          created_at: string
          id: string
          interswitch_ref: string | null
          notes: string | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          status: Database["public"]["Enums"]["booking_status"]
          style_id: string
          stylist_id: string
          time_slot: string
          updated_at: string
        }
        Insert: {
          amount?: number | null
          appointment_date: string
          client_address?: string | null
          client_id: string
          confirmation_code?: string | null
          created_at?: string
          id?: string
          interswitch_ref?: string | null
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          status?: Database["public"]["Enums"]["booking_status"]
          style_id: string
          stylist_id: string
          time_slot: string
          updated_at?: string
        }
        Update: {
          amount?: number | null
          appointment_date?: string
          client_address?: string | null
          client_id?: string
          confirmation_code?: string | null
          created_at?: string
          id?: string
          interswitch_ref?: string | null
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          status?: Database["public"]["Enums"]["booking_status"]
          style_id?: string
          stylist_id?: string
          time_slot?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_style_id_fkey"
            columns: ["style_id"]
            isOneToOne: false
            referencedRelation: "hairstyles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_stylist_id_fkey"
            columns: ["stylist_id"]
            isOneToOne: false
            referencedRelation: "stylist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hairstyles: {
        Row: {
          category: Database["public"]["Enums"]["hairstyle_category"]
          created_at: string
          description: string | null
          duration_hrs: number | null
          id: string
          images: string[] | null
          is_trending: boolean
          name: string
          price_max: number | null
          price_min: number | null
        }
        Insert: {
          category: Database["public"]["Enums"]["hairstyle_category"]
          created_at?: string
          description?: string | null
          duration_hrs?: number | null
          id?: string
          images?: string[] | null
          is_trending?: boolean
          name: string
          price_max?: number | null
          price_min?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["hairstyle_category"]
          created_at?: string
          description?: string | null
          duration_hrs?: number | null
          id?: string
          images?: string[] | null
          is_trending?: boolean
          name?: string
          price_max?: number | null
          price_min?: number | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string
          client_id: string
          comment: string | null
          created_at: string
          id: string
          rating: number
          stylist_id: string
        }
        Insert: {
          booking_id: string
          client_id: string
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          stylist_id: string
        }
        Update: {
          booking_id?: string
          client_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          stylist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_stylist_id_fkey"
            columns: ["stylist_id"]
            isOneToOne: false
            referencedRelation: "stylist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stylist_profiles: {
        Row: {
          average_rating: number
          bio: string | null
          created_at: string
          id: string
          is_available: boolean
          portfolio_images: string[] | null
          service_area: string[] | null
          service_mode: Database["public"]["Enums"]["service_mode"]
          specialties: string[] | null
          total_reviews: number
          updated_at: string
          user_id: string
          wallet_balance: number
        }
        Insert: {
          average_rating?: number
          bio?: string | null
          created_at?: string
          id?: string
          is_available?: boolean
          portfolio_images?: string[] | null
          service_area?: string[] | null
          service_mode?: Database["public"]["Enums"]["service_mode"]
          specialties?: string[] | null
          total_reviews?: number
          updated_at?: string
          user_id: string
          wallet_balance?: number
        }
        Update: {
          average_rating?: number
          bio?: string | null
          created_at?: string
          id?: string
          is_available?: boolean
          portfolio_images?: string[] | null
          service_area?: string[] | null
          service_mode?: Database["public"]["Enums"]["service_mode"]
          specialties?: string[] | null
          total_reviews?: number
          updated_at?: string
          user_id?: string
          wallet_balance?: number
        }
        Relationships: [
          {
            foreignKeyName: "stylist_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stylist_styles: {
        Row: {
          created_at: string
          hairstyle_id: string
          id: string
          portfolio_images: string[] | null
          stylist_id: string
          stylist_price: number | null
        }
        Insert: {
          created_at?: string
          hairstyle_id: string
          id?: string
          portfolio_images?: string[] | null
          stylist_id: string
          stylist_price?: number | null
        }
        Update: {
          created_at?: string
          hairstyle_id?: string
          id?: string
          portfolio_images?: string[] | null
          stylist_id?: string
          stylist_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stylist_styles_hairstyle_id_fkey"
            columns: ["hairstyle_id"]
            isOneToOne: false
            referencedRelation: "hairstyles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stylist_styles_stylist_id_fkey"
            columns: ["stylist_id"]
            isOneToOne: false
            referencedRelation: "stylist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          area: string | null
          avatar_url: string | null
          city: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          area?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          area?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "declined"
      hairstyle_category:
        | "braids"
        | "cornrows"
        | "locs"
        | "weaves"
        | "wigs"
        | "natural"
        | "twists"
        | "crochet"
        | "updos"
      payment_status: "unpaid" | "paid" | "refunded"
      service_mode: "salon" | "mobile" | "both"
      user_role: "client" | "stylist"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
        "declined",
      ],
      hairstyle_category: [
        "braids",
        "cornrows",
        "locs",
        "weaves",
        "wigs",
        "natural",
        "twists",
        "crochet",
        "updos",
      ],
      payment_status: ["unpaid", "paid", "refunded"],
      service_mode: ["salon", "mobile", "both"],
      user_role: ["client", "stylist"],
    },
  },
} as const
