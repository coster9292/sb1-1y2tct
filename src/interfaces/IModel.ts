// Interface for "models" table
export interface IModel {
    model_id: number; // Primary key
    make_id: number;  // Foreign key referencing "makes.make_id"
    name: string;     // Name of the model
}
