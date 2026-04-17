export async function POST(request) {


    const formData = await request.formData();

    const file = formData.get('file');
    const {name, type} = file;
    console.log(file);
    return Response.json(file);
}