import _announcement from "@/data/Announcement.json";

const Announcement = () => {
    return _announcement.show ? (
        <div className="w-full h-14 p-2 bg-gradient-to-r from-[#9E44EF] to-[#DBB8BF] bg-blue-300 flex items-center justify-center text-white">
            <div className="w-full flex gap-3 md:gap-6 items-center justify-center">
                <p>{_announcement.text}</p>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default Announcement;
