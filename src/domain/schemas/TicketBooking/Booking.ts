import { Model, DataTypes } from "sequelize";
import { postgresConnector } from "../../../core/utils/absoluteFilePath";

const status = ['confirmed', 'rac', 'waiting'] as const;
const berthType = ['lower', 'upper', 'side-lower', 'side-upper'] as const;
type StatusType = (typeof status)[number];
type BerthType = (typeof berthType)[number];

interface BookingAttributes {
    id: number;
    TrainId: number;
    passenger: number;
    berthType: BerthType;
    status: StatusType;
    isSeatAllocating: Boolean;
    createdAt: Date;
    updatedAt: Date;

}


export default class BookingModel extends Model<BookingAttributes> implements BookingAttributes {
    id: number;
    TrainId: number;
    passenger: number;
    berthType: BerthType;
    status: StatusType;
    isSeatAllocating: Boolean;
    createdAt: Date;
    updatedAt: Date;

}

BookingModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        status: {
            type: DataTypes.ENUM('confirmed', 'rac', 'waiting'),
            allowNull: false,
        },
        berthType: {
            type: DataTypes.ENUM('lower', 'upper', 'side-lower', 'side-upper'),
            allowNull: true,
            defaultValue: "upper"
        },
        TrainId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Trains', // Name of the Train table
                key: 'TrainId',
            },
        },
        passenger: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'passenger',
                key: 'id',
            },
        },
        isSeatAllocating: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize: postgresConnector,
        modelName: "booking",
        tableName: "booking",
        timestamps: true,
        paranoid: true,
    },
);


