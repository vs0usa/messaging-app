import Image from "next/image"

export const MessagesRecipientEmpty = () => {
  return (
    <div className="flex size-full h-[calc(100%-92px)] flex-col items-center justify-center px-16 text-center">
      <Image
        src="/illustrations/sending-messages.svg"
        className="select-none"
        alt="Sending message"
        width={300}
        height={300}
      />
      <p className="mb-2 mt-8">This conversation is empty</p>
      <p className="text-muted-foreground">
        You can start a conversation by sending a message to this contact.
      </p>
    </div>
  )
}
