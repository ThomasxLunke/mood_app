'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { deleteEntry } from '@/utils/api'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function DeleteEntryDialog({ entryId }: { entryId: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)
    try {
      await deleteEntry(entryId)
      // Always close + stop the spinner on success — router.push alone
      // never did either, and did nothing at all when already on
      // /journal (same-path navigation is a no-op), which is why the
      // dialog got stuck on "Suppression..." from the list page.
      setOpen(false)
      setIsDeleting(false)
      if (pathname === `/journal/${entryId}`) {
        // Deleted from the entry's own page — it no longer exists, leave it.
        router.push('/journal')
      } else {
        // Deleted from the list itself — refresh its data in place.
        router.refresh()
      }
    } catch (err) {
      console.error('Failed to delete entry:', err)
      setError("Impossible de supprimer l'entrée pour le moment.")
      setIsDeleting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setError(null)
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Supprimer l&rsquo;entrée</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer cette entrée&nbsp;?</DialogTitle>
          <DialogDescription>
            Cette action est définitive. L&rsquo;entrée et son analyse seront
            supprimées.
          </DialogDescription>
        </DialogHeader>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Suppression...' : 'Supprimer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
