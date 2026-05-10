// Channel and Provider Types
// Centralized types for channel configuration and providers

/**
 * Provider information for a channel type
 */
export interface Provider {
  id: string;
  name: string;
  description: string;
  recommended?: boolean;
  popular?: boolean;
  /**
   * Marks the provider as "Coming soon" — rendered visibly in pickers but
   * forced-disabled with a badge. Used for v1-paused channels (Evolution Go,
   * Notificame, Z-API) so users can see what's planned without being able to
   * configure them yet. See CLAUDE.md "v1 channel scope".
   */
  comingSoon?: boolean;
}

/**
 * Supported channel types in the system
 */
export type ChannelTypeId =
  | 'web_widget'
  | 'whatsapp'
  | 'facebook'
  | 'instagram'
  | 'telegram'
  | 'sms'
  | 'email'
  | 'api';

/**
 * Channel type with its configuration and available providers
 */
export interface ChannelType {
  id: string;
  name: string;
  description: string;
  icon?: string;
  type: ChannelTypeId;
  providers?: Provider[];
  /**
   * Top-level "Coming soon" — same semantics as Provider.comingSoon but for
   * the channel grid (Facebook, Instagram in v1, etc).
   */
  comingSoon?: boolean;
}

/**
 * Form data for channel configuration
 * Flexible structure to accommodate different channel types
 */
export interface ChannelFormData {
  [key: string]: string | boolean;
}
