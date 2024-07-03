import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  /* Pathname is everything that comes after the domain name in the url  */
  const { pathname } = useLocation()

  return (
    /**
     * This data current means that if the page i'm currently in, is the same as the property to used on the component call,
     * it means that i'm already on the route, and we can conditionally render a className based on the data-current
     */
    <Link
      data-current={pathname === props.to}
      className="hover: flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
      {...props}
    />
  )
}
