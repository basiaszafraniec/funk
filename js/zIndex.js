let _z = 10;

export function nextZ() {
    return ++_z;
}

export function bringToFront(el) {
    if (!el) return;
    el.style.zIndex = ++_z;
}