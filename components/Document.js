import Image from "next/image";
import Link from "next/link";

const Document = ({ document }) => {
  const converter = (size) => {
    if (size >= 1073741824) {
      return Math.rount((size / 1073741824) * 100) / 100 + " Go";
    } else if (size >= 1048576) {
      return Math.round((size / 1048576) * 100) / 100 + " Mo";
    } else if (size >= 1024) {
      return Math.round((size / 1024) * 100) / 100 + " Ko";
    } else {
      return size + " o";
    }
  };

  return (
    <div className="">
      <h2>Mes documents</h2>
      {document.map((element) => (
        <Link key={element.id} href={element.link[0].url}>
          <span>{element.description}</span>
          <Image
            src={element.picture[0].url}
            alt={`image du site ${element.title}`}
            width={500}
            height={500}
            priority
          />
          <span>{converter(element.link[0].size)}</span>
        </Link>
      ))}
    </div>
  );
};

export default Document;
