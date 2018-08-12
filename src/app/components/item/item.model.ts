/**
 * Created by uptownjimmy on 7/13/17.
 */

export class Item {
    public name: string;
    public item_Type: number;
    public active: boolean;
    public notes: string;
    public id: number;
    public created_By: string;
    public modified_By: string;

    constructor(
        name: string,
        item_Type: number,
        active: boolean,
        notes: string,
        id?: number,
        created_By?: string,
        modified_By?: string
    ) {
        this.name = name;
        this.item_Type = item_Type;
        this.active = active;
        this.notes = notes;
        this.id = id;
        this.created_By = created_By;
        this.modified_By = modified_By;
    }
}
