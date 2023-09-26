export interface ICars {
  id: string;
  title: string;
  model: string;
  tanirovka: boolean;
  motor: number;
  year: number;
  color: string;
  distance: string;
  gearbook: string;
  description: string;
  narx: number;
  img_model: string;
  img_ichki: string;
  img_tashqi: string;
}
export interface ICarsUpdate {
  title?: string;
  model?: string;
  tanirovka?: boolean;
  motor?: number;
  year?: number;
  color?: string;
  distance?: string;
  gearbook?: string;
  description?: string;
  narx?: number;
  img_model?: string;
  img_ichki?: string;
  img_tashqi?: string;
}

