import { Controller, type Control, useWatch } from 'react-hook-form';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Textarea,
  Button,
} from '@evoapi/design-system';
import { Trash2 } from 'lucide-react';
import {
  ALL_ACTION_NAMES,
  actionRegistry,
  type AutomationRuleFormData,
} from '@/pages/Customer/Automation/registries';
import type { AutomationFormData } from '@/hooks/automation/useAutomationFormData';
import type { AutomationActionType } from '@/types/automation';

interface Props {
  control: Control<AutomationRuleFormData>;
  index: number;
  formData: AutomationFormData;
  onRemove: () => void;
  onActionChange: (index: number, actionName: AutomationActionType) => void;
}

export default function ActionRow({
  control,
  index,
  formData,
  onRemove,
  onActionChange,
}: Props) {
  const { t } = useLanguage('automation');
  const actionName = useWatch({ control, name: `actions.${index}.action_name` });

  return (
    <div className="flex items-start gap-2 p-3 border rounded-md">
      <div className="flex-1 grid grid-cols-2 gap-2">
        <Controller
          control={control}
          name={`actions.${index}.action_name`}
          render={({ field }) => (
            <Select
              value={field.value ?? ''}
              onValueChange={(value) => {
                onActionChange(index, value as AutomationActionType);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('form.fields.actionRow.action')} />
              </SelectTrigger>
              <SelectContent>
                {ALL_ACTION_NAMES.map((name) => (
                  <SelectItem key={name} value={name}>
                    {t(actionRegistry[name].i18nKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <ActionParamsRenderer
          control={control}
          index={index}
          actionName={actionName as AutomationActionType | undefined}
          formData={formData}
          t={t}
        />
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        aria-label={t('form.fields.actionRow.remove')}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface ParamsProps {
  control: Control<AutomationRuleFormData>;
  index: number;
  actionName: AutomationActionType | undefined;
  formData: AutomationFormData;
  t: (key: string) => string;
}

function ActionParamsRenderer({ control, index, actionName, formData, t }: ParamsProps) {
  if (!actionName) {
    return <div className="text-xs text-muted-foreground">{t('form.fields.actionRow.selectActionFirst')}</div>;
  }

  switch (actionName) {
    case 'send_message':
    case 'send_webhook_event':
    case 'send_email_transcript':
      return (
        <Controller
          control={control}
          name={`actions.${index}.action_params`}
          render={({ field }) => (
            <Input
              value={asString(field.value, 0)}
              onChange={(e) => field.onChange([e.target.value])}
              placeholder={t(`form.fields.actionRow.params.${actionName}`)}
            />
          )}
        />
      );

    case 'assign_team':
      return (
        <SelectParam
          control={control}
          index={index}
          options={formData.teams}
          placeholder={t('form.fields.actionRow.params.assign_team')}
        />
      );

    case 'assign_agent':
      return (
        <SelectParam
          control={control}
          index={index}
          options={formData.agents}
          placeholder={t('form.fields.actionRow.params.assign_agent')}
        />
      );

    case 'add_label':
    case 'remove_label':
      return (
        <SelectParam
          control={control}
          index={index}
          options={formData.labels}
          placeholder={t(`form.fields.actionRow.params.${actionName}`)}
          coerce="array"
        />
      );

    case 'change_priority':
      return (
        <SelectParam
          control={control}
          index={index}
          options={formData.priorities}
          placeholder={t('form.fields.actionRow.params.change_priority')}
        />
      );

    case 'change_status':
      return (
        <SelectParam
          control={control}
          index={index}
          options={formData.statuses}
          placeholder={t('form.fields.actionRow.params.change_status')}
        />
      );

    case 'assign_to_pipeline':
      return (
        <SelectParam
          control={control}
          index={index}
          options={formData.pipelines}
          placeholder={t('form.fields.actionRow.params.assign_to_pipeline')}
        />
      );

    case 'update_pipeline_stage':
      return (
        <SelectParam
          control={control}
          index={index}
          options={formData.pipelineStages}
          placeholder={t('form.fields.actionRow.params.update_pipeline_stage')}
        />
      );

    case 'send_email_to_team':
      return (
        <Controller
          control={control}
          name={`actions.${index}.action_params`}
          render={({ field }) => {
            const current = (field.value as Array<Record<string, unknown>>)?.[0] ?? {
              team_ids: [],
              message: '',
            };
            return (
              <Textarea
                value={(current.message as string) ?? ''}
                onChange={(e) =>
                  field.onChange([{ ...current, message: e.target.value }])
                }
                placeholder={t('form.fields.actionRow.params.send_email_to_team')}
                rows={2}
              />
            );
          }}
        />
      );

    case 'create_pipeline_task':
      return (
        <Controller
          control={control}
          name={`actions.${index}.action_params`}
          render={({ field }) => {
            const current = (field.value as Array<Record<string, unknown>>)?.[0] ?? {
              title: '',
            };
            return (
              <Input
                value={(current.title as string) ?? ''}
                onChange={(e) => field.onChange([{ ...current, title: e.target.value }])}
                placeholder={t('form.fields.actionRow.params.create_pipeline_task')}
              />
            );
          }}
        />
      );

    case 'mute_conversation':
    case 'snooze_conversation':
    case 'resolve_conversation':
      return <div className="text-xs text-muted-foreground">{t('form.fields.actionRow.noParams')}</div>;

    case 'send_attachment':
      return (
        <div className="text-xs text-muted-foreground">
          {t('form.fields.actionRow.params.send_attachment_pending')}
        </div>
      );

    default:
      return null;
  }
}

interface SelectParamProps {
  control: Control<AutomationRuleFormData>;
  index: number;
  options: { id: string | number; name: string }[];
  placeholder: string;
  coerce?: 'single' | 'array';
}

function SelectParam({ control, index, options, placeholder, coerce = 'single' }: SelectParamProps) {
  return (
    <Controller
      control={control}
      name={`actions.${index}.action_params`}
      render={({ field }) => {
        const current =
          coerce === 'array'
            ? Array.isArray(field.value) ? field.value : []
            : Array.isArray(field.value) ? field.value[0] : null;

        const selectedValue =
          coerce === 'array'
            ? (current as Array<string | number>)[0] !== undefined
              ? String((current as Array<string | number>)[0])
              : ''
            : current != null
              ? String(current)
              : '';

        return (
          <Select
            value={selectedValue}
            onValueChange={(value) => {
              if (coerce === 'array') {
                field.onChange([value]);
              } else {
                const parsed = Number.isNaN(Number(value)) ? value : Number(value);
                field.onChange([parsed]);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={String(opt.id)} value={String(opt.id)}>
                  {opt.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }}
    />
  );
}

function asString(value: unknown, idx: number): string {
  if (Array.isArray(value)) {
    const v = value[idx];
    return v == null ? '' : String(v);
  }
  return '';
}
