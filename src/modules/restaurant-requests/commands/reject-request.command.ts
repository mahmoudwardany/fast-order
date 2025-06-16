import { AdminCommentDto } from '../dto/admin-comment.dto';

export class RejectRequestCommand {
  constructor(
    public readonly requestId: number,
    public readonly payload: AdminCommentDto,
  ) {}
}
