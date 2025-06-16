import { AdminCommentDto } from '../dto/admin-comment.dto';

export class ApproveRequestCommand {
  constructor(
    public readonly requestId: number,
    public readonly payload: AdminCommentDto,
  ) {}
}
