export class EmailLogger {
  static logRequest(data: unknown) {
    console.log('📧 Request data:', JSON.stringify(data, null, 2));
  }

  static logImages(imageUrls: unknown) {
    console.log('🖼️ Image URLs:', JSON.stringify(imageUrls, null, 2));
  }

  static logEmailSending(from: string, to: string) {
    console.log(`📤 Sending email from ${from} to ${to}`);
  }

  static logEmailResponse(response: unknown) {
    console.log('📬 Email response:', JSON.stringify(response, null, 2));
  }

  static logResendError(error: unknown) {
    console.error('❌ Resend error:', error);
  }

  static logSuccess() {
    console.log('✅ Email sent successfully');
  }

  static logError(error: unknown) {
    console.error('💥 Error:', error);
  }
}
