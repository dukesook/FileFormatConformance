import clsx from "clsx";
import { Coverage } from "@/types/json";
import { addOrdinalSuffix } from "@/utils";
import { FaExternalLinkAlt } from "react-icons/fa";
import { spec_info as specs } from "../../data/coverage.json";

export default function SpecsCovered({
    compact,
    className
}: {
    compact?: boolean;
    className?: string;
}) {
    return (
        <div className={clsx("rounded-md border-1 border-gray-300 bg-white shadow-md", className)}>
            <div className={clsx("border-b-2 px-3 py-2", !compact && "text-lg")}>
                <b>{specs.length}</b> specifications covered
            </div>
            <div className="flex max-h-[250px] max-w-xl cursor-pointer flex-col divide-y-1 overflow-y-auto">
                {specs.map((info: Coverage["spec_info"][0]) => (
                    <a
                        key={info.ISO}
                        className={clsx(
                            "group flex items-center justify-between gap-2 truncate px-3 py-2 font-light hover:bg-gray-100",
                            compact && "!py-1 text-sm font-normal"
                        )}
                        href={info.link}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <span>
                            ISO/IEC {info.ISO}:{info.date} (
                            <span className="font-bold">{info.name}</span>):{" "}
                            {addOrdinalSuffix(info.version)} Edition{" "}
                            {info.amendmends &&
                                info.amendmends.length > 0 &&
                                `, ${info.amendmends.join(", ")}`}
                            {info.corrigenda &&
                                info.corrigenda.length > 0 &&
                                `, ${info.corrigenda.join(", ")}`}
                        </span>
                        <FaExternalLinkAlt className="text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </a>
                ))}
            </div>
        </div>
    );
}

SpecsCovered.defaultProps = {
    className: "",
    compact: false
};
