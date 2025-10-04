import { TrashIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/alert-dialog"
import { useChat } from "@/hooks/use-chat"

type Props = {
  id: string
}

export const MessageDeleteButton = ({ id }: Props) => {
  const { deleteMessage } = useChat()

  const handleDelete = () => {
    deleteMessage(id)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="hover:text-destructive hover:bg-destructive/20 absolute right-1 top-1 rounded-full p-2 opacity-0 transition-[color,background-color,opacity] group-hover/message:opacity-100">
          <TrashIcon className="size-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Message</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this message? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
