import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDebounceCallback } from "usehooks-ts"
import { z } from "zod/v4"
import {
  Form,
  FormButton,
  FormControl,
  FormField,
  FormItem,
} from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { useChat } from "@/hooks/use-chat"
import { useMessagesStore } from "@/stores/messages-store"

const schema = z.object({
  content: z.string().min(1),
})

type Props = {
  id: string
}

export const ChatBoxInput = ({ id }: Props) => {
  const { typingRecipients } = useMessagesStore()
  const { sendTypingStart, sendMessage } = useChat()
  const isTyping = typingRecipients.includes(id)

  const debounced = useDebounceCallback(
    () => {
      if (form.getValues("content").length < 1) return
      sendTypingStart(id)
    },
    1000,
    { maxWait: 1000 },
  )
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { content: "" },
  })

  const handleSubmit = (values: z.infer<typeof schema>) => {
    sendMessage(id, values.content)
    form.reset()
  }

  return (
    <div className="flex flex-col gap-1 p-4">
      <p
        className="text-muted-foreground invisible text-sm data-[typing=true]:visible"
        data-typing={isTyping}
      >
        Recipient is typing...
      </p>
      <Form {...form}>
        <form className="flex gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <Input
                    placeholder="Type a message"
                    {...field}
                    onChange={(e) => {
                      debounced()
                      field.onChange(e)
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormButton className="w-fit" variant="outline">
            Send
          </FormButton>
        </form>
      </Form>
    </div>
  )
}
