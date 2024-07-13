import { Link, useRouteError } from 'react-router-dom'

export interface NotFoundProps {}

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Oops, something went wrong!</h1>
      <p className="text-accent-foreground">
        An error happened on the app, below you will found more details of it
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        Go Back To{' '}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
