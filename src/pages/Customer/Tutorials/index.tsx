import { useLanguage } from '@/hooks/useLanguage';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@evoapi/design-system';
import { GraduationCap } from 'lucide-react';
import { TUTORIAL_VIDEOS } from './videos';

const Tutorials = () => {
  const { t } = useLanguage('tutorials');

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 pb-4">
        <div>
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground mt-1">{t('description')}</p>
        </div>
      </div>

      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {TUTORIAL_VIDEOS.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <GraduationCap className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold">
              {t('emptyState.title')}
            </h2>
            <p className="text-muted-foreground mt-1 max-w-md">
              {t('emptyState.description')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {TUTORIAL_VIDEOS.map((video) => (
              <Card key={video.loomId} className="overflow-hidden">
                <div className="aspect-video bg-black">
                  <iframe
                    src={`https://www.loom.com/embed/${video.loomId}`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={video.title}
                    style={{ border: 'none' }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-base">{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutorials;
