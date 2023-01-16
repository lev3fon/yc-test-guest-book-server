// @ts-nocheck
const {declareType, TypedData, Types} = require('ydb-sdk');

interface IMessage {
    strId: string;
    text: string;
    createdAt: Date;
    creatorName: string;
    creatorIp: string;
}
class Message extends TypedData {
    @declareType(Types.UTF8)
    public strId: string;

    @declareType(Types.UTF8)
    public text: string;

    @declareType(Types.DATETIME)
    public createdAt: Date;

    @declareType(Types.UTF8)
    public creatorName: string;

    @declareType(Types.UTF8)
    public creatorIp: string;

    static create(strId: string, text: string, createdAt: Date, creatorName: string, creatorIp: string): Message {
        return new this({strId, text, createdAt, creatorName, creatorIp});
    }

    constructor(data: IMessage) {
        super(data);
    }
}

module.exports = {
    Message
}

// export function getSeriesData() {
//     return Series.asTypedCollection([
//         Series.create(1, "IT Crowd", new Date("2006-02-03"),
//             "The IT Crowd is a British sitcom produced by Channel 4, written by Graham Linehan, produced by " +
//             "Ash Atalla and starring Chris O'Dowd, Richard Ayoade, Katherine Parkinson, and Matt Berry."),
//         Series.create(2, "Silicon Valley",  new Date("2014-04-06"),
//             "Silicon Valley is an American comedy television series created by Mike Judge, John Altschuler and " +
//             "Dave Krinsky. The series focuses on five young men who founded a startup company in Silicon Valley.")
//     ]);
// }

