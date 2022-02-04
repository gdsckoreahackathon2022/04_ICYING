import datetime
import os


# Image File Upload Utilities
def set_filename_format(now, instance, filename):
    return "{username}-{date}-{microsecond}{extension}" \
        .format(username=instance.user_id,
                date=str(now.date()),
                microsecond=now.microsecond,
                extension=os.path.splitext(filename)[1])


def user_directory_path(instance, filename):
    now = datetime.datetime.now()
    path = "images/{year}/{month}/{day}/{username}/{filename}" \
        .format(year=now.year,
                month=now.month,
                day=now.day,
                username=instance.user_id,
                filename=set_filename_format(now, instance, filename))
    return path
