from django.template.loader import get_template
from io import BytesIO
from xhtml2pdf import pisa
from django.http import HttpResponse

def pdf_renderer(template_src, context =  {}):
    template = get_template(template_src)
    html  = template.render(context)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
    if pdf.err:
        raise ValueError("Invalid Pdf")
    return pdf