export interface categoryData {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface dropDownCategoriesModel {
  label: string;
  value: string | number;
  custom?: React.ReactNode;
}
