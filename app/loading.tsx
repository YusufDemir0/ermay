export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-cream">
            <div className="flex flex-col items-center gap-4">
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-4 border-light-gray" />
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-gold" />
                </div>
                <p className="text-sm font-medium text-medium-gray">Yükleniyor...</p>
            </div>
        </div>
    )
}
