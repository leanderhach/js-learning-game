export async function getSprite(folder, file)
{
    let img = new Image();
    img.src = `/sprites/${folder}/${file}`;

    await img.decode();
    return img;
}