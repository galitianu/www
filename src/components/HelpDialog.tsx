import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const HelpDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon' aria-label='Help'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='10' />
            <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
            <path d='M12 17h.01' />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[85dvh] overflow-y-auto pt-16 pb-8 sm:max-h-[80dvh]'>
        <DialogHeader>
          <DialogTitle>Getting started guide</DialogTitle>
          <DialogDescription>Quick tips for working with the galitianu.com starter.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='space-y-2'>
            <h4 className='font-medium'>🚀 Quick start</h4>
            <ul className='list-disc space-y-1 pl-5'>
              <li>
                Clone the repository
                <code className='bg-muted ml-2 rounded px-1.5 py-0.5 text-sm'>git clone [repository-url]</code>
              </li>
              <li>
                Install dependencies
                <code className='bg-muted ml-2 rounded px-1.5 py-0.5 text-sm'>npm install</code>
              </li>
              <li>
                Start the development server
                <code className='bg-muted ml-2 rounded px-1.5 py-0.5 text-sm'>npm run dev</code>
              </li>
            </ul>
          </div>

          <div className='space-y-2'>
            <h4 className='font-medium'>⚡️ Key capabilities</h4>
            <ul className='list-disc space-y-1 pl-5'>
              <li>
                <em>Astro v5</em>: Fast builds, hybrid rendering, and islands architecture
                <span className='text-muted-foreground ml-2 block text-sm'>Optimized for static hosting and SSR</span>
              </li>
              <li>
                <em>TailwindCSS v4</em>: Utility-first CSS with modern syntax and OKLCH defaults
                <span className='text-muted-foreground ml-2 block text-sm'>
                  Custom properties drive the light/dark themes
                </span>
              </li>
              <li>
                <em>shadcn/ui</em>: Copy-and-own components for complete control
                <span className='text-muted-foreground ml-2 block text-sm'>
                  Buttons, dialogs, cards, and more baked in
                </span>
              </li>
              <li>
                <em>Dark mode</em>: Syncs with the OS or manual overrides saved in localStorage
                <span className='text-muted-foreground ml-2 block text-sm'>Powered by CSS custom properties</span>
              </li>
            </ul>
          </div>

          <div className='space-y-2'>
            <h4 className='font-medium'>🔧 Environment targets</h4>
            <ul className='list-disc space-y-1 pl-5'>
              <li>
                <em>Development</em>: NODE_ENV=development
                <span className='text-muted-foreground ml-2 block text-sm'>
                  Starts on http://localhost:3000 by default
                </span>
              </li>
              <li>
                <em>Staging</em>: npm run stg
                <span className='text-muted-foreground ml-2 block text-sm'>
                  Generates builds with staging URLs applied
                </span>
              </li>
              <li>
                <em>Production</em>: npm run prod
                <span className='text-muted-foreground ml-2 block text-sm'>
                  Outputs the fully optimized production bundle
                </span>
              </li>
            </ul>
          </div>

          <div className='space-y-2'>
            <h4 className='font-medium'>📝 Customization</h4>
            <p className='text-muted-foreground text-sm'>
              Environment-aware URLs live in
              <code className='bg-muted mx-1 rounded px-1.5 py-0.5'>src/lib/constants.ts</code>.
            </p>
          </div>

          <div className='space-y-2'>
            <h4 className='font-medium'>📚 Resources</h4>
            <p className='text-muted-foreground text-sm'>
              See the
              <a
                href='https://github.com/galitianu/galitianu.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary ml-1 hover:underline'
              >
                GitHub repository
              </a>
              for docs and issues.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
