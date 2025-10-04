import Image from "next/image"

export const MessagesEmpty = () => {
  return (
    <div className="hidden size-full flex-col items-center justify-center p-16 text-center md:flex">
      <Image
        src="/illustrations/empty.svg"
        className="select-none"
        alt="Empty"
        width={300}
        height={300}
      />
      <p className="mb-2 mt-8">Select a contact to start a conversation</p>
      <p className="text-muted-foreground">
        You can start a conversation by selecting a contact from the list on the
        left.
      </p>
    </div>
  )
}
