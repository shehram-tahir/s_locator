import statistics
import time
import psycopg2
from psycopg2.extras import Json


def latency(databseinfo, num_tests=100):
    latencies = []

    for _ in range(num_tests):
        print(f"starting test num: {_}")
        conn = psycopg2.connect(**databseinfo)
        start_time = time.time()
        cur = conn.cursor()
        cur.execute("SELECT 1")
        cur.fetchone()
        cur.close()
        conn.close()

        end_time = time.time()
        diftime = (end_time - start_time) * 1000  # Convert to milliseconds
        latencies.append(diftime)

    avg_latency = statistics.mean(latencies)
    min_latency = min(latencies)
    max_latency = max(latencies)
    median_latency = statistics.median(latencies)
    total_time = sum(latencies)
    conn.close()

    print(f"Number of tests: {num_tests}")
    print(f"Average latency: {avg_latency:.2f} ms")
    print(f"Minimum latency: {min_latency:.2f} ms")
    print(f"Maximum latency: {max_latency:.2f} ms")
    print(f"Median latency: {median_latency:.2f} ms")
    print(f"Total time: {total_time:.2f} ms")


databseinfo = {
    "dbname": "aqar_scraper",
    "user": "scraper_user",
    "password": "scraper_password",
    "host": "localhost",
    "port": "5432",
}


latency(databseinfo)
    