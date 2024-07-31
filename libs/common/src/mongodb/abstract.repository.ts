import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  Connection,
  ClientSession,
  PipelineStage,
  AnyBulkWriteOperation,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  ObjectId(id: Types.ObjectId | string): Types.ObjectId {
    return new Types.ObjectId(id);
  }

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    return this.model.create(document);
  }

  async findMany(match: FilterQuery<TDocument>) {
    return this.model.find(match, {}, { lean: true });
  }

  async findOne(match: FilterQuery<TDocument>) {
    return this.model.findOne(match, {}, { lean: true });
  }

  async findOneById(id: Types.ObjectId | string) {
    return this.model.findById({ _id: this.ObjectId(id) }, {}, { lean: true });
  }

  async updateOne(
    match: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    return this.model.updateOne(match, update);
  }

  async updateSingleById(
    id: Types.ObjectId | string,
    update: UpdateQuery<TDocument>,
  ) {
    return this.model.updateOne({ _id: this.ObjectId(id) }, update);
  }

  async updateMany(
    match: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    return this.model.updateMany(match, update);
  }

  async deleteOne(match: FilterQuery<TDocument>): Promise<object> {
    return this.model.deleteOne(match);
  }

  async deleteOneById(id: Types.ObjectId | string): Promise<object> {
    return this.model.deleteOne({ _id: this.ObjectId(id) });
  }

  async deleteMany(match: FilterQuery<TDocument>): Promise<object> {
    return this.model.deleteMany(match);
  }

  async aggregate(pipeline: PipelineStage[]) {
    const result = await this.model.aggregate(pipeline);

    return result;
  }

  async bulkWrite(writes: AnyBulkWriteOperation<object>[]): Promise<object> {
    const result = await this.model.bulkWrite(writes);

    return result;
  }

  async startTransaction(): Promise<ClientSession> {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
