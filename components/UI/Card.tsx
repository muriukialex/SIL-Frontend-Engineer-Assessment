interface CardProps {
  username: string
  email: string
  phone: string
  website: string
}

const Card = ({ username, email, phone, website }: CardProps) => {
  return (
    <div className="relative mt-6 flex w-full flex-col rounded bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
          Username: {username}
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          Email: {email}
        </p>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          Phone number: {phone}
        </p>

        <a
          className="font-sans text-base font-light underline"
          href={
            website.startsWith("https")
              ? `https://${website}`
              : `http://${website}`
          }
          target="_blank"
          rel="noreferrer"
        >
          {website}
        </a>
      </div>
    </div>
  )
}

export default Card
