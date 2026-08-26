const ADDRESS = "MQS Technologies, KK House, Plot No. B-35/1, Industrial Estate, Sanathnagar, Hyderabad 500018, Telangana, India";
const EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;

export default function ContactMap() {
  return (
    <div className="relative overflow-hidden bg-[#E9F0F4]" style={{ aspectRatio: "var(--mapratio)" }}>
      <iframe
        src={EMBED_URL}
        title="Google Maps location of MQS Technologies, Sanathnagar, Hyderabad"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
