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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blood_inventory: {
        Row: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          hospital_id: string
          id: string
          last_updated: string | null
          quantity_ml: number
        }
        Insert: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          hospital_id: string
          id?: string
          last_updated?: string | null
          quantity_ml?: number
        }
        Update: {
          blood_type?: Database["public"]["Enums"]["blood_type"]
          hospital_id?: string
          id?: string
          last_updated?: string | null
          quantity_ml?: number
        }
        Relationships: [
          {
            foreignKeyName: "blood_inventory_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_requests: {
        Row: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at: string | null
          fulfilled_at: string | null
          hospital_id: string
          id: string
          matched_donation_id: string | null
          patient_name: string
          quantity_ml: number
          reason: string
          status: Database["public"]["Enums"]["request_status"] | null
          updated_at: string | null
          urgency: string
        }
        Insert: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at?: string | null
          fulfilled_at?: string | null
          hospital_id: string
          id?: string
          matched_donation_id?: string | null
          patient_name: string
          quantity_ml: number
          reason: string
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
          urgency: string
        }
        Update: {
          blood_type?: Database["public"]["Enums"]["blood_type"]
          created_at?: string | null
          fulfilled_at?: string | null
          hospital_id?: string
          id?: string
          matched_donation_id?: string | null
          patient_name?: string
          quantity_ml?: number
          reason?: string
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
          urgency?: string
        }
        Relationships: [
          {
            foreignKeyName: "blood_requests_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blood_requests_matched_donation_id_fkey"
            columns: ["matched_donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          block_number: string | null
          blockchain_tx_hash: string | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at: string | null
          donation_date: string
          donor_id: string
          id: string
          location: string
          notes: string | null
          qr_code: string | null
          quantity_ml: number
          status: Database["public"]["Enums"]["donation_status"] | null
          updated_at: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          block_number?: string | null
          blockchain_tx_hash?: string | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at?: string | null
          donation_date: string
          donor_id: string
          id?: string
          location: string
          notes?: string | null
          qr_code?: string | null
          quantity_ml: number
          status?: Database["public"]["Enums"]["donation_status"] | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          block_number?: string | null
          blockchain_tx_hash?: string | null
          blood_type?: Database["public"]["Enums"]["blood_type"]
          created_at?: string | null
          donation_date?: string
          donor_id?: string
          id?: string
          location?: string
          notes?: string | null
          qr_code?: string | null
          quantity_ml?: number
          status?: Database["public"]["Enums"]["donation_status"] | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      hospitals: {
        Row: {
          address: string
          city: string
          created_at: string | null
          hospital_name: string
          id: string
          license_number: string
          updated_at: string | null
          user_id: string
          verified: boolean | null
        }
        Insert: {
          address: string
          city: string
          created_at?: string | null
          hospital_name: string
          id?: string
          license_number: string
          updated_at?: string | null
          user_id: string
          verified?: boolean | null
        }
        Update: {
          address?: string
          city?: string
          created_at?: string | null
          hospital_name?: string
          id?: string
          license_number?: string
          updated_at?: string | null
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          blood_type: Database["public"]["Enums"]["blood_type"] | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          location: string | null
          phone: string | null
          updated_at: string | null
          wallet_address: string | null
        }
        Insert: {
          blood_type?: Database["public"]["Enums"]["blood_type"] | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          location?: string | null
          phone?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Update: {
          blood_type?: Database["public"]["Enums"]["blood_type"] | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "donor" | "hospital"
      blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
      donation_status: "pending" | "verified" | "used" | "expired"
      request_status: "pending" | "matched" | "fulfilled" | "cancelled"
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
      app_role: ["admin", "donor", "hospital"],
      blood_type: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      donation_status: ["pending", "verified", "used", "expired"],
      request_status: ["pending", "matched", "fulfilled", "cancelled"],
    },
  },
} as const
