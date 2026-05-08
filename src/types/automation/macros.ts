import type { StandardResponse, PaginatedResponse, PaginationMeta } from '@/types/core';
import type { User } from '@/types/users';

export interface MacroAction {
  action_name: string;
  action_params: any[];
}

export interface Macro {
  id: string;
  name: string;
  visibility: 'personal' | 'global';
  actions: MacroAction[];
  created_by?: User;
  updated_by?: User;
  files?: MacroFile[];
  created_at: string;
  updated_at: string;
}

export interface MacroFile {
  id: string;
  macro_id: string;
  file_type: string;
  file_url: string;
  blob_id: string;
  filename: string;
}

export interface MacrosResponse extends PaginatedResponse<Macro> {}

export interface MacroResponse extends StandardResponse<Macro> {}

export interface MacroDeleteResponse extends StandardResponse<{ message: string }> {}

export interface MacroCreateData {
  name: string;
  visibility: 'personal' | 'global';
  actions: MacroAction[];
}

export interface MacroUpdateData extends MacroCreateData {
  id: string;
}

export interface MacroExecuteData {
  macroId: string;
  conversationIds: string[];
}

export interface MacrosListParams {
  page?: number;
  per_page?: number;
}

export interface MacroActionType {
  key: string;
  name: string;
  inputType: 'text' | 'textarea' | 'select' | 'multi_select' | 'email' | 'url' | 'file' | null;
  description: string;
  options?: Array<{ value: string | number; label: string }>;
}

export interface MacrosState {
  macros: Macro[];
  selectedMacroIds: string[];
  meta: {
    pagination: PaginationMeta;
  };
  loading: {
    list: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    execute: boolean;
  };
  filters: any[];
  searchQuery: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

// Ações disponíveis para macros - melhoradas com labels amigáveis
export const MACRO_ACTION_TYPES: MacroActionType[] = [
  {
    key: 'send_message',
    name: 'Send message',
    inputType: 'textarea',
    description: 'Sends an automated message in the conversation',
  },
  {
    key: 'add_label',
    name: 'Add label',
    inputType: 'multi_select',
    description: 'Adds labels to the conversation',
  },
  {
    key: 'remove_label',
    name: 'Remove label',
    inputType: 'multi_select',
    description: 'Removes labels from the conversation',
  },
  {
    key: 'assign_team',
    name: 'Assign team',
    inputType: 'select',
    description: 'Assigns the conversation to a specific team',
  },
  {
    key: 'assign_agent',
    name: 'Assign agent',
    inputType: 'select',
    description: 'Assigns the conversation to a specific agent',
  },
  {
    key: 'remove_assigned_team',
    name: 'Remove team assignment',
    inputType: null,
    description: 'Removes the team assignment from the conversation',
  },
  {
    key: 'mute_conversation',
    name: 'Mute conversation',
    inputType: null,
    description: 'Mutes the conversation to stop receiving notifications',
  },
  {
    key: 'change_status',
    name: 'Change status',
    inputType: 'select',
    description: 'Changes the conversation status',
    options: [
      { value: 'open', label: 'Open' },
      { value: 'resolved', label: 'Resolved' },
      { value: 'pending', label: 'Pending' },
    ],
  },
  {
    key: 'resolve_conversation',
    name: 'Resolve conversation',
    inputType: null,
    description: 'Marks the conversation as resolved',
  },
  {
    key: 'snooze_conversation',
    name: 'Snooze conversation',
    inputType: 'text',
    description: 'Snoozes the conversation until a specific date (in hours)',
  },
  {
    key: 'change_priority',
    name: 'Change priority',
    inputType: 'select',
    description: 'Changes the conversation priority',
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'urgent', label: 'Urgent' },
    ],
  },
  {
    key: 'send_email_transcript',
    name: 'Send email transcript',
    inputType: 'email',
    description: 'Sends the conversation transcript to an email',
  },
  {
    key: 'send_attachment',
    name: 'Send attachment',
    inputType: 'file',
    description: 'Sends a file attachment in the conversation',
  },
  {
    key: 'add_private_note',
    name: 'Add private note',
    inputType: 'textarea',
    description: 'Adds a private note to the conversation',
  },
  {
    key: 'send_webhook_event',
    name: 'Send webhook',
    inputType: 'url',
    description: 'Triggers a webhook to an external endpoint',
  },
];
