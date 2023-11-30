export interface SettingQr {
    id?: string;
    user_id: string;
    farm_id: string;
    carbon_footprint: object;
    water_footprint: object[];
    environmental_certificates: object[];
    personal_data_preferences: object;
    created_at?: Date;
  }