import {
  Card,
  CardContent,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@evoapi/design-system';
import { ChannelIcon } from '@/components/channels';
import { ChannelType } from '@/hooks/channels/useChannelForm';
import { useLanguage } from '@/hooks/useLanguage';

interface ChannelCardProps {
  channel: ChannelType;
  disabled?: boolean;
  disabledTooltip?: string;
  onClick: () => void;
  'data-tour'?: string;
}

export const ChannelCard = ({
  channel,
  disabled = false,
  disabledTooltip,
  onClick,
  'data-tour': dataTour,
}: ChannelCardProps) => {
  const { t } = useLanguage('channels');
  // v1-paused channels (Facebook, Instagram) render visibly with a "Coming
  // soon" badge instead of being hidden. The flag overrides any external
  // disabled state — those gates are about per-installation OAuth config,
  // ours is a product-roadmap gate.
  const comingSoon = !!channel.comingSoon;
  const effectiveDisabled = comingSoon || disabled;
  const effectiveTooltip = comingSoon
    ? t('newChannel.providers.badges.comingSoonTooltip')
    : disabledTooltip;

  const card = (
    <Card
      className={`relative h-full transition-all duration-200 border-sidebar-border rounded-lg ${
        effectiveDisabled
          ? 'opacity-60 cursor-not-allowed bg-sidebar'
          : 'cursor-pointer bg-sidebar hover:bg-sidebar-accent/50 hover:border-sidebar-border hover:shadow-md'
      }`}
      onClick={() => !effectiveDisabled && onClick()}
      data-tour={dataTour}
    >
      {comingSoon && (
        <div className="absolute -top-2 right-4 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-medium">
          {t('newChannel.providers.badges.comingSoon')}
        </div>
      )}
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <ChannelIcon channelType={channel.type} size="xl" />
        </div>
        <h3 className="font-semibold text-sidebar-foreground mb-2">{channel.name}</h3>
        <p className="text-sm text-sidebar-foreground/70 leading-relaxed">
          {channel.description}
        </p>
      </CardContent>
    </Card>
  );

  if (effectiveDisabled && effectiveTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="h-full">{card}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{effectiveTooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return card;
};
