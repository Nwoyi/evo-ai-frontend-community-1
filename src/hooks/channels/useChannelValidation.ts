import { toast } from 'sonner';

export interface FormData {
  [key: string]: string | boolean;
}

export const useChannelValidation = () => {
  const getStr = (form: FormData, key: string, fallback = ''): string =>
    typeof form[key] === 'string' ? (form[key] as string) : fallback;

  const validateWebWidget = (form: FormData) => {
    if (!getStr(form, 'name').trim()) {
      toast.error('Channel name is required');
      return false;
    }
    if (!getStr(form, 'website_url').trim()) {
      toast.error('Website URL is required');
      return false;
    }
    // Validate URL format
    try {
      new URL(getStr(form, 'website_url'));
    } catch {
      toast.error('Website URL must be a valid URL (e.g. https://mysite.com)');
      return false;
    }
    return true;
  };

  const validateTwilioWhatsapp = (form: FormData) => {
    if (!getStr(form, 'name').trim()) {
      toast.error('Channel name is required');
      return false;
    }
    if (!getStr(form, 'account_sid').trim()) {
      toast.error('Account SID is required');
      return false;
    }
    if (!getStr(form, 'auth_token').trim()) {
      toast.error('Auth Token is required');
      return false;
    }
    if (form.use_api_key && !getStr(form, 'api_key_sid').trim()) {
      toast.error('API Key SID is required when using an API Key');
      return false;
    }
    if (form.use_messaging_service) {
      if (!getStr(form, 'messaging_service_sid').trim()) {
        toast.error('Messaging Service SID is required');
        return false;
      }
    } else {
      if (!getStr(form, 'phone_number').trim()) {
        toast.error('Phone is required');
        return false;
      }
      // Validate phone number format (E.164)
      const phonePattern = /^\+[1-9]\d{1,14}$/;
      if (!phonePattern.test(getStr(form, 'phone_number'))) {
        toast.error('Phone must be in international format (e.g. +14155551234)');
        return false;
      }
    }
    return true;
  };

  const validateNotificame = (form: FormData) => {
    if (!getStr(form, 'name').trim()) {
      toast.error('Channel name is required');
      return false;
    }
    if (!getStr(form, 'phone_number').trim()) {
      toast.error('Phone is required');
      return false;
    }
    if (!getStr(form, 'api_token').trim()) {
      toast.error('API Token is required');
      return false;
    }
    if (!getStr(form, 'channel_id').trim()) {
      toast.error('Channel ID is required');
      return false;
    }
    // Validate phone number format (E.164)
    const phonePattern = /^\+[1-9]\d{1,14}$/;
    if (!phonePattern.test(getStr(form, 'phone_number'))) {
      toast.error('Phone must be in international format (e.g. +14155551234)');
      return false;
    }
    return true;
  };

  const validateEvolution = (form: FormData, hasEvolutionConfig: boolean) => {
    if (!getStr(form, 'name').trim()) {
      toast.error('Channel name is required');
      return false;
    }
    if (!getStr(form, 'phone_number').trim()) {
      toast.error('Phone is required');
      return false;
    }
    if (!hasEvolutionConfig) {
      if (!getStr(form, 'api_url').trim()) {
        toast.error('API URL is required');
        return false;
      }
      if (!getStr(form, 'admin_token').trim()) {
        toast.error('Admin Token is required');
        return false;
      }
    }
    // Validate phone number format (E.164)
    const phonePattern = /^\+[1-9]\d{1,14}$/;
    if (!phonePattern.test(getStr(form, 'phone_number'))) {
      toast.error('Phone must be in international format (e.g. +14155551234)');
      return false;
    }
    return true;
  };

  const validateEvolutionGo = (form: FormData, hasEvolutionGoConfig: boolean) => {
    if (!getStr(form, 'name').trim()) {
      toast.error('Channel name is required');
      return false;
    }
    if (!getStr(form, 'phone_number').trim()) {
      toast.error('Phone is required');
      return false;
    }
    if (!hasEvolutionGoConfig) {
      if (!getStr(form, 'api_url').trim()) {
        toast.error('API URL is required');
        return false;
      }
      if (!getStr(form, 'admin_token').trim()) {
        toast.error('Admin Token is required');
        return false;
      }
    }
    // Validate phone number format (E.164)
    const phonePattern = /^\+[1-9]\d{1,14}$/;
    if (!phonePattern.test(getStr(form, 'phone_number'))) {
      toast.error('Phone must be in international format (e.g. +14155551234)');
      return false;
    }
    return true;
  };

  const validateZapi = (form: FormData) => {
    if (!getStr(form, 'name').trim()) {
      toast.error('Channel name is required');
      return false;
    }
    if (!getStr(form, 'phone_number').trim()) {
      toast.error('Phone is required');
      return false;
    }
    if (!getStr(form, 'instance_id').trim()) {
      toast.error('Instance ID is required');
      return false;
    }
    if (!getStr(form, 'token').trim()) {
      toast.error('Token is required');
      return false;
    }
    if (!getStr(form, 'client_token').trim()) {
      toast.error('Client Token is required');
      return false;
    }
    // Validate phone number format (E.164)
    const phonePattern = /^\+[1-9]\d{1,14}$/;
    if (!phonePattern.test(getStr(form, 'phone_number'))) {
      toast.error('Phone must be in international format (e.g. +14155551234)');
      return false;
    }
    return true;
  };

  const validateByChannelAndProvider = (
    channelType: string,
    providerId: string | undefined,
    form: FormData,
    config?: {
      hasEvolutionConfig?: boolean;
      hasEvolutionGoConfig?: boolean;
    }
  ): boolean => {
    switch (channelType) {
      case 'web_widget':
        return validateWebWidget(form);

      case 'whatsapp':
        if (!providerId) return false;

        switch (providerId) {
          case 'twilio':
            return validateTwilioWhatsapp(form);
          case 'notificame':
            return validateNotificame(form);
          case 'evolution':
            return validateEvolution(form, config?.hasEvolutionConfig ?? false);
          case 'evolution_go':
            return validateEvolutionGo(form, config?.hasEvolutionGoConfig ?? false);
          case 'zapi':
            return validateZapi(form);
          default:
            return true;
        }

      default:
        return true;
    }
  };

  return {
    validateWebWidget,
    validateTwilioWhatsapp,
    validateNotificame,
    validateEvolution,
    validateEvolutionGo,
    validateZapi,
    validateByChannelAndProvider,
    getStr,
  };
};
