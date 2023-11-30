export interface Media{
    id?: string
    created_at?: Date
    type: TYPE
    user_id: string
    file_data: Buffer
  
  }
  export type TYPE = 'image' | 'video';