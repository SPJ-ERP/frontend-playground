"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import BREADCRUMB_PATHS, { type BreadcrumbPathNode } from "@/ers-resources/constant/path/breadcrumb"

// ─── Types ───────────────────────────────────────────────────────────────────

interface BreadcrumbCrumb {
  path: string
  name: string
  disabled?: boolean
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Recursively walks the BREADCRUMB_PATHS tree and builds a flat array of
 * crumbs that match the leading segments of `pathname`.
 *
 * Returns `null` when the node (or any of its children) does NOT match the
 * current path, so the recursive caller can skip it.
 */
function resolveCrumbs(
  nodes: BreadcrumbPathNode[],
  pathname: string
): BreadcrumbCrumb[] | null {
  for (const node of nodes) {
    // The current pathname must start with this node's path.
    const isMatch =
      pathname === node.path ||
      pathname.startsWith(node.path === "/" ? node.path : node.path + "/")

    if (!isMatch) continue

    // Build the base crumb for this node.
    const crumb: BreadcrumbCrumb = {
      path: node.path,
      name: node.name,
      disabled: node.disabled,
    }

    // Exact match → this is the leaf.
    if (pathname === node.path) {
      return [crumb]
    }

    // Try to go deeper via subMenuList.
    const children: BreadcrumbPathNode[] = [
      ...(node.subMenuList ?? []),
      ...(node.subMenu ?? []),
    ]

    if (children.length > 0) {
      const childCrumbs = resolveCrumbs(children, pathname)
      if (childCrumbs) {
        return [crumb, ...childCrumbs]
      }
    }

    // No deeper match; treat this node as the current page.
    return [crumb]
  }

  return null
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Maximum number of crumbs shown inline (excluding the first "root" crumb).
 * Any crumbs in between are collapsed into an ellipsis dropdown.
 */
const MAX_VISIBLE = 3

export function BreadcrumbCustom() {
  const pathname = usePathname()
  const crumbs = resolveCrumbs(BREADCRUMB_PATHS, pathname) ?? []

  if (crumbs.length === 0) return null

  const first = crumbs[0]
  const last = crumbs[crumbs.length - 1]
  const middle = crumbs.slice(1, -1) // everything between first and last

  // Determine which middle crumbs are visible vs. collapsed.
  const showEllipsis = middle.length > MAX_VISIBLE
  const visibleMiddle = showEllipsis ? middle.slice(-MAX_VISIBLE) : middle
  const collapsedMiddle = showEllipsis ? middle.slice(0, middle.length - MAX_VISIBLE) : []

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* ── First crumb (root / parent) ─────────────────────────── */}
        <BreadcrumbItem className="text-xl font-semibold">
          {crumbs.length === 1 ? (
            <BreadcrumbPage>{first.name}</BreadcrumbPage>
          ) : first.disabled ? (
            <span className="text-muted-foreground">{first.name}</span>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={first.path}>{first.name}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* ── Ellipsis for collapsed middle crumbs ────────────────── */}
        {showEllipsis && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon-sm" variant="ghost">
                    <BreadcrumbEllipsis />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    {collapsedMiddle.map((crumb) => (
                      <DropdownMenuItem key={crumb.path} asChild>
                        {crumb.disabled ? (
                          <span>{crumb.name}</span>
                        ) : (
                          <Link href={crumb.path}>{crumb.name}</Link>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}

        {/* ── Visible middle crumbs ───────────────────────────────── */}
        {visibleMiddle.map((crumb) => (
          <>
            <BreadcrumbSeparator key={`sep-${crumb.path}`} />
            <BreadcrumbItem key={crumb.path}>
              {crumb.disabled ? (
                <span className="text-muted-foreground">{crumb.name}</span>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.path}>{crumb.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        ))}

        {/* ── Last crumb (current page) ────────────────────────────── */}
        {crumbs.length > 1 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{last.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
