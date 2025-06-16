import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '../config/config.service';

@Processor('mail')
export class MailProcessor {
  constructor(private readonly configservice: ConfigService) {}
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: this.configservice.get('APP_EMAIL_ADDRESS'),
      pass: this.configservice.get('APP_PASSWORD'),
    },
  });

  @Process('send-approval')
  async handleApprovalEmail(job: Job) {
    const { to, name, adminComment } = job.data;
    try {
      await this.transporter.sendMail({
        to,
        subject: '✅ Your Restaurant Request is Approved!',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #28a745;">🎉 Congratulations, ${name}!</h2>
            <p>Your restaurant request has been <strong>approved</strong> successfully.</p>
            ${
              adminComment
                ? `<p><strong>Admin Comment:</strong><br><em>${adminComment}</em></p>`
                : ''
            }
            <p>We’re excited to have you on board. Welcome!</p>
            <br>
            <p style="font-size: 0.9em; color: #777;">This is an automated message. Please don’t reply.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('❌ Failed to send approval email:', error);
    }
  }

  @Process('send-rejection')
  async handleSendRejection(job: Job) {
    const { to, name, adminComment } = job.data;
    try {
      await this.transporter.sendMail({
        to,
        subject: '❌ Your Restaurant Request was Rejected',
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #dc3545;">Hello, ${name}</h2>
            <p>We’re sorry to inform you that your restaurant request has been <strong>rejected</strong>.</p>
            ${
              adminComment
                ? `<p><strong>Admin Comment:</strong><br><em>${adminComment}</em></p>`
                : ''
            }
            <p>You may review the comments and try again later. We wish you the best of luck.</p>
            <br>
            <p style="font-size: 0.9em; color: #777;">This is an automated message. Please don’t reply.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('❌ Failed to send rejection email:', error);
    }
  }
}
