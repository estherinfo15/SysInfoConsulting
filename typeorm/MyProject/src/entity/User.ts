import {Entity, PrimaryGeneratedColumn,Unique,CreateDateColumn,UpdateDateColumn, Column, TreeChildren} from "typeorm";
import { MinLength,IsNotEmpty,IsEmail, isNotEmpty} from "class-validator";
import * as bcrypt from 'bcryptjs';
//TODO Is Email
@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    @MinLength(5)
    @IsEmail()
    @IsNotEmpty()
    username:string

    @Column()
    @MinLength(5)
    @IsNotEmpty()
    password:string

    @Column()
    @IsNotEmpty()
    @IsNotEmpty()
    role:string

    @Column()
    @CreateDateColumn()
    createdAT:Date

    @Column()
    @UpdateDateColumn()
    updateAT:Date

    hashpassword():void{//creando el hash
        const salt=bcrypt.genSaltSync(10);
        this.password=bcrypt.hashSync(this.password,salt);
    }
    checkPassword(password:string):boolean{//cuando los usuarios se intenten loggear
        return bcrypt.compareSync(password,this.password);
    }

}
