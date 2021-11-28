import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    //unique true checks in the database to only have one database
    @Column({ unique: true})
    username:string;

    @Column()
    password:string;

}