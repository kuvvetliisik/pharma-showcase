export default function Loading() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="relative">
                {/* Spinning circle */}
                <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-spin border-t-primary-600"></div>
            </div>
            <p className="mt-4 text-slate-500 font-medium">Yükleniyor...</p>
        </div>
    );
}
