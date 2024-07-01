import { sendEmailNotification, createInAppNotification, getInAppNotifications } from '../services/notificationService';
import { post, get } from '../services/api';

jest.mock('../services/api');

describe('Notification Service', () => {
  it('should send email notification', async () => {
    post.mockResolvedValue({});
    await sendEmailNotification('test@example.com', 'Test Subject', 'Test Message');
    expect(post).toHaveBeenCalledWith('/send-email', {
      to: 'test@example.com',
      subject: 'Test Subject',
      text: 'Test Message',
    });
  });

  it('should create in-app notification', async () => {
    post.mockResolvedValue({});
    await createInAppNotification('content-id', 'Test Message');
    expect(post).toHaveBeenCalledWith('/notifications', {
      contentId: 'content-id',
      message: 'Test Message',
    });
  });

  it('should get in-app notifications', async () => {
    const mockNotifications = [{ id: '1', contentId: 'content-id', message: 'Test Message' }];
    get.mockResolvedValue(mockNotifications);
    const notifications = await getInAppNotifications();
    expect(get).toHaveBeenCalledWith('/notifications');
    expect(notifications).toEqual(mockNotifications);
  });
});