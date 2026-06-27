import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/fr')({
  beforeLoad: () => {
    throw redirect({
      to: '/',
    });
  },
});
