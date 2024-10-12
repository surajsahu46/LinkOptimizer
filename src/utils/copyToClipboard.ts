export async function copyToClipboard(txt: string) {
    try {
        const clipboardItem = new ClipboardItem({
            "text/plain": new Blob([txt], { type: "text/plain" }),
        });
        await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
        await navigator.clipboard.writeText(txt);
    }
};