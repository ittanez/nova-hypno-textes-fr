export class EmailLogger {
  static logRequest(data: any) {
    console.log('📧 Request data:', JSON.stringify(data, null, 2));
  }

  static logImages(imageUrls: any) {
    console.log('🖼️ Image URLs:', JSON.stringify(imageUrls, null, 2));
  }

  static logEmailSending(from: string, to: string) {
    console.log(`📤 Sending email from ${from} to ${to}`);
  }

  static logEmailResponse(response: any) {
    console.log('📬 Email response:', JSON.stringify(response, null, 2));
  }

  static logResendError(error: any) {
    console.error('❌ Resend error:', error);
  }

  static logSuccess() {
    console.log('✅ Email sent successfully');
  }

  static logError(error: any) {
    console.error('💥 Error:', error);
  }
}
