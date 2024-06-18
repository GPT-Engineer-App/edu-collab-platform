import { sendEmailNotification, createInAppNotification, getInAppNotifications } from '../services/notificationService';
import { post, get } from '../services/api';

jest.mock('../services/api');

describe('Notification Service', () => {
  it('should send email notification', async () => {
    post.mockResolvedValue({});
    await sendEmailNotification('test@example.com', 'Updated Subject', 'Updated Message');
    expect(post).toHaveBeenCalledWith('/send-email', {
      to: 'test@example.com',
      subject: 'Updated Subject',
      text: 'Updated Message',
    });
  });

  it('should create in-app notification', async () => {
    post.mockResolvedValue({});
    await createInAppNotification('content-id', 'Updated Message');
    expect(post).toHaveBeenCalledWith('/notifications', {
      contentId: 'content-id',
      message: 'Updated Message',
    });
  });

  it('should get in-app notifications', async () => {
    const mockNotifications = [{ id: '1', contentId: 'content-id', message: 'Updated Message' }];
    get.mockResolvedValue(mockNotifications);
    const notifications = await getInAppNotifications();
    expect(get).toHaveBeenCalledWith('/notifications');
    expect(notifications).toEqual(mockNotifications);
  });
});