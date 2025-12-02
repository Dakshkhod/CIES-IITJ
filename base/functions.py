

def getattr_recursive(instance, field):
    if instance is None:
        return None
    if "." in field:
        field = field.split(".")
        return getattr_recursive(getattr(instance, field[0], None), ".".join(field[1:]))
    return getattr(instance, field, None)
